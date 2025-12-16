// app/dashboard/registrations/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  Eye,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Image as ImageIcon,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  AlertCircle,
  Send,
} from "lucide-react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Registration {
  id: number;
  name: string;
  email: string;
  mobile: string;
  collegeId: string | null;
  selectedEvents: number[];
  eventCodes: string;
  eventNames: string;
  eventDetails: any;
  totalAmount: number;
  registrationToken: string;
  paymentVerified: boolean;
  paymentReceipt: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // Modal states
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [registrationToDelete, setRegistrationToDelete] =
    useState<Registration | null>(null);
  const [approvingId, setApprovingId] = useState<number | null>(null);

  const fetchRegistrations = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
        sortBy: "createdAt",
        sortOrder: "desc",
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/registrations?${params}`);
      const data = await response.json();

      console.log(data, "data");

      if (data.success) {
        setRegistrations(data.data);
        setPagination(
          data.pagination || { page, limit: 10, total: 0, totalPages: 1 }
        );
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== "") {
        fetchRegistrations(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(registrations.map((reg) => reg.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleEdit = (registration: Registration) => {
    // Implement edit functionality
    console.log("Edit registration:", registration);
    alert(`Edit registration: ${registration.name}`);
  };

  const handleDelete = (registration: Registration) => {
    setRegistrationToDelete(registration);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!registrationToDelete) return;

    try {
      const response = await fetch(
        `/api/registrations/${registrationToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove from state
        setRegistrations((prev) =>
          prev.filter((reg) => reg.id !== registrationToDelete.id)
        );
        setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
        toast.success("Registration deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
      toast.error("Failed to delete registration");
    } finally {
      setDeleteModalOpen(false);
      setRegistrationToDelete(null);
    }
  };

  // Update the handleApprove function in your page.tsx
  const handleApprove = async (registration: Registration) => {
    setApprovingId(registration.id);
    try {
      console.log("Approving registration:", registration.id);

      const response = await fetch(
        `/api/registrations/${registration.id}/approve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: registration.email,
            name: registration.name,
            registrationToken: registration.registrationToken,
            eventNames: registration.eventNames,
            totalAmount: registration.totalAmount,
          }),
        }
      );

      const data = await response.json();
      console.log("API response:", data);

      if (response.ok && data.success) {
        // Update in state
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg.id === registration.id ? { ...reg, paymentVerified: true } : reg
          )
        );
        toast.success("Registration approved and email sent!");
      } else {
        throw new Error(
          data.error || data.message || "Failed to approve registration"
        );
      }
    } catch (error: any) {
      console.error("Error approving registration:", error);
      toast.error(error.message || "Failed to approve registration");
    } finally {
      setApprovingId(null);
    }
  };

  const handleBatchApprove = async () => {
    if (selectedRows.length === 0) return;

    const selectedRegistrations = registrations.filter(
      (reg) => selectedRows.includes(reg.id) && !reg.paymentVerified
    );

    if (selectedRegistrations.length === 0) {
      toast.info("No pending registrations selected");
      return;
    }

    try {
      // Show confirmation
      const confirmed = window.confirm(
        `Are you sure you want to approve ${selectedRegistrations.length} registration(s)? Emails will be sent to all selected participants.`
      );

      if (!confirmed) return;

      // Approve all selected
      const promises = selectedRegistrations.map((reg) =>
        fetch(`/api/registrations/${reg.id}/approve`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: reg.email,
            name: reg.name,
            registrationToken: reg.registrationToken,
            eventNames: reg.eventNames,
            totalAmount: reg.totalAmount,
          }),
        })
      );

      const results = await Promise.all(promises);
      const allSuccessful = results.every((res) => res.ok);

      if (allSuccessful) {
        // Update all in state
        setRegistrations((prev) =>
          prev.map((reg) =>
            selectedRows.includes(reg.id)
              ? { ...reg, paymentVerified: true }
              : reg
          )
        );
        toast.success(
          `Approved ${selectedRegistrations.length} registration(s) and sent emails!`
        );
        setSelectedRows([]);
      } else {
        throw new Error("Some approvals failed");
      }
    } catch (error) {
      console.error("Error batch approving:", error);
      toast.error("Failed to approve some registrations");
    }
  };

  const handleViewImage = (imageUrl: string) => {
    console.log(imageUrl, "sdfef");
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchRegistrations(newPage);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Mobile",
      "College ID",
      "Events",
      "Amount",
      "Token",
      "Status",
      "Date",
    ];
    const rows = registrations.map((reg) => [
      reg.id,
      `"${reg.name}"`,
      `"${reg.email}"`,
      `"${reg.mobile}"`,
      `"${reg.collegeId || ""}"`,
      `"${reg.eventNames}"`,
      reg.totalAmount,
      `"${reg.registrationToken}"`,
      reg.paymentVerified ? "Verified" : "Pending",
      new Date(reg.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    toast.success("CSV exported successfully");
  };

  const getStatusBadge = (verified: boolean) => {
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          verified
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
        }`}
      >
        {verified ? (
          <>
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </>
        ) : (
          <>
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </>
        )}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Registrations Management
          </h1>
          <p className="text-white/60">Manage all participant registrations</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => fetchRegistrations()}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search by name, email, token..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>
          <div>
            <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-black focus:outline-none focus:border-pink-500">
              <option value="">All Status</option>
              <option value="verified">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500 mb-4"></div>
            <p className="text-white/60">Loading registrations...</p>
          </div>
        ) : registrations.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-white/30 mx-auto mb-4" />
            <p className="text-white/60">No registrations found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          registrations.length > 0 &&
                          selectedRows.length === registrations.length
                        }
                        className="rounded border-white/20 bg-white/10 text-pink-500 focus:ring-pink-500"
                      />
                    </th>
                    <th className="text-left px-6 py-4 text-white/60 font-medium">
                      Participant
                    </th>
                    <th className="text-left px-6 py-4 text-white/60 font-medium">
                      Contact
                    </th>
                    <th className="text-left px-6 py-4 text-white/60 font-medium">
                      Events
                    </th>
                    <th className="text-left px-6 py-4 text-white/60 font-medium">
                      Payment
                    </th>
                    <th className="text-left px-6 py-4 text-white/60 font-medium">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-white/60 font-medium">
                      Date
                    </th>
                    <th className="text-left px-6 py-4 text-white/60 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((registration) => (
                    <tr
                      key={registration.id}
                      className="border-b border-white/5 hover:bg-white/5 group"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(registration.id)}
                          onChange={() => handleSelectRow(registration.id)}
                          className="rounded border-white/20 bg-white/10 text-pink-500 focus:ring-pink-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-pink-400" />
                            </div>
                            <div>
                              <p className="font-medium text-white">
                                {registration.name}
                              </p>
                              <p className="text-xs text-white/60">
                                {registration.registrationToken}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-white/40" />
                            <p className="text-white/80 text-sm">
                              {registration.email}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-white/40" />
                            <p className="text-white/80 text-sm">
                              {registration.mobile}
                            </p>
                          </div>
                          {registration.collegeId && (
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-white/40" />
                              <p className="text-white/80 text-sm">
                                {registration.collegeId}
                              </p>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="text-white/80 text-sm mb-1">
                            {registration.eventNames}
                          </p>
                          <p className="text-xs text-white/60">
                            {registration.selectedEvents?.length || 0} events •
                            ₹{registration.totalAmount}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            handleViewImage(registration.paymentReceipt)
                          }
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors"
                        >
                          <ImageIcon className="w-4 h-4" />
                          View Receipt
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(registration.paymentVerified)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white/60 text-sm">
                          {new Date(
                            registration.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(registration)}
                            className="p-2 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors text-blue-400"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(registration)}
                            className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {!registration.paymentVerified && (
                            <button
                              onClick={() => handleApprove(registration)}
                              disabled={approvingId === registration.id}
                              className="p-2 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors text-green-400 disabled:opacity-50"
                              title="Approve and Send Email"
                            >
                              {approvingId === registration.id ? (
                                <div className="w-4 h-4 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-white/60 text-sm">
                Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                of {pagination.total} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 text-white" />
                </button>
                <span className="px-3 py-1 bg-white/10 rounded-lg text-white">
                  {pagination.page} / {pagination.totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Selected Actions */}
      {selectedRows.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl shadow-2xl p-4 flex items-center gap-4">
          <span className="text-white font-medium">
            {selectedRows.length} item{selectedRows.length > 1 ? "s" : ""}{" "}
            selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBatchApprove}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Approve Selected
            </button>
            <button
              onClick={() => {
                // Batch delete
                selectedRows.forEach((id) => {
                  const reg = registrations.find((r) => r.id === id);
                  if (reg) {
                    handleDelete(reg);
                  }
                });
                setSelectedRows([]);
              }}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-colors"
            >
              Delete Selected
            </button>
            <button
              onClick={() => setSelectedRows([])}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {imageModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-white">
                Payment Receipt
              </h3>
              <button
                onClick={() => setImageModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-center bg-black/20 rounded-xl p-8">
                {selectedImage ? (
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={selectedImage}
                      alt="Payment Receipt"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <ImageIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <p className="text-white/60">No receipt image available</p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setImageModalOpen(false)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                >
                  Close
                </button>
                {selectedImage && (
                  <a
                    href={selectedImage}
                    download="payment-receipt.jpg"
                    className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Download Image
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && registrationToDelete && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 max-w-md w-full">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Delete Registration
                  </h3>
                  <p className="text-white/60 text-sm">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-white font-medium">
                  {registrationToDelete.name}
                </p>
                <p className="text-white/60 text-sm">
                  {registrationToDelete.email}
                </p>
                <p className="text-white/60 text-sm">
                  {registrationToDelete.registrationToken}
                </p>
              </div>
            </div>
            <div className="p-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setDeleteModalOpen(false);
                  setRegistrationToDelete(null);
                }}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                Delete Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
