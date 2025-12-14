"use client";

import Image from "next/image";

interface Person {
  name: string;
  role: "Student Coordinator" | "Teacher Coordinator";
  phone?: string;
  image: string;
}

interface EventTeam {
  eventName: string;
  students: Person[];
  teachers: Person[];
}

const teamData: EventTeam[] = [
  {
    eventName: "AI Workshop",
    students: [
      {
        name: "Rahul Patil",
        role: "Student Coordinator",
        phone: "+91 98765 43210",
        image: "/team/students/rahul.jpg",
      },
      {
        name: "Sneha Kulkarni",
        role: "Student Coordinator",
        phone: "+91 91234 56789",
        image: "/team/students/sneha.jpg",
      },
    ],
    teachers: [
      {
        name: "Dr. A. Sharma",
        role: "Teacher Coordinator",
        image: "/team/teachers/sharma.jpg",
      },
      {
        name: "Prof. R. Deshpande",
        role: "Teacher Coordinator",
        image: "/team/teachers/deshpande.jpg",
      },
    ],
  },
  {
    eventName: "Web Development Hackathon",
    students: [
      {
        name: "Amit Joshi",
        role: "Student Coordinator",
        phone: "+91 99887 66554",
        image: "/team/students/amit.jpg",
      },
      {
        name: "Pooja More",
        role: "Student Coordinator",
        phone: "+91 90909 12121",
        image: "/team/students/pooja.jpg",
      },
    ],
    teachers: [
      {
        name: "Prof. S. Kulkarni",
        role: "Teacher Coordinator",
        image: "/team/teachers/kulkarni.jpg",
      },
      {
        name: "Dr. M. Jadhav",
        role: "Teacher Coordinator",
        image: "/team/teachers/jadhav.jpg",
      },
    ],
  },
  {
    eventName: "Startup Pitch",
    students: [
      {
        name: "Kunal Shah",
        role: "Student Coordinator",
        phone: "+91 90123 45678",
        image: "/team/students/kunal.jpg",
      },
      {
        name: "Neha Desai",
        role: "Student Coordinator",
        phone: "+91 93456 78901",
        image: "/team/students/neha.jpg",
      },
    ],
    teachers: [
      {
        name: "Dr. P. Mehta",
        role: "Teacher Coordinator",
        image: "/team/teachers/mehta.jpg",
      },
      {
        name: "Prof. R. Iyer",
        role: "Teacher Coordinator",
        image: "/team/teachers/iyer.jpg",
      },
    ],
  },
  {
    eventName: "UI/UX Design Challenge",
    students: [
      {
        name: "Aditya Kulkarni",
        role: "Student Coordinator",
        phone: "+91 98877 66554",
        image: "/team/students/aditya.jpg",
      },
      {
        name: "Riya Patil",
        role: "Student Coordinator",
        phone: "+91 97766 55443",
        image: "/team/students/riya.jpg",
      },
    ],
    teachers: [
      {
        name: "Prof. N. Pawar",
        role: "Teacher Coordinator",
        image: "/team/teachers/pawar.jpg",
      },
      {
        name: "Dr. S. Joshi",
        role: "Teacher Coordinator",
        image: "/team/teachers/joshi.jpg",
      },
    ],
  },
  {
    eventName: "Cyber Awareness Talk",
    students: [
      {
        name: "Omkar Shinde",
        role: "Student Coordinator",
        phone: "+91 96655 44332",
        image: "/team/students/omkar.jpg",
      },
      {
        name: "Anjali Kapse",
        role: "Student Coordinator",
        phone: "+91 95544 33221",
        image: "/team/students/anjali.jpg",
      },
    ],
    teachers: [
      {
        name: "Dr. V. Patwardhan",
        role: "Teacher Coordinator",
        image: "/team/teachers/patwardhan.jpg",
      },
      {
        name: "Prof. D. Kulkarni",
        role: "Teacher Coordinator",
        image: "/team/teachers/dkulkarni.jpg",
      },
    ],
  },
  {
    eventName: "Data Science Bootcamp",
    students: [
      {
        name: "Saurabh Naik",
        role: "Student Coordinator",
        phone: "+91 94433 22110",
        image: "/team/students/saurabh.jpg",
      },
      {
        name: "Komal Patil",
        role: "Student Coordinator",
        phone: "+91 93322 11009",
        image: "/team/students/komal.jpg",
      },
    ],
    teachers: [
      {
        name: "Prof. A. Chavan",
        role: "Teacher Coordinator",
        image: "/team/teachers/chavan.jpg",
      },
      {
        name: "Dr. K. More",
        role: "Teacher Coordinator",
        image: "/team/teachers/more.jpg",
      },
    ],
  },
  {
    eventName: "Robotics Expo",
    students: [
      {
        name: "Rohit Bansode",
        role: "Student Coordinator",
        phone: "+91 92211 33445",
        image: "/team/students/rohit.jpg",
      },
      {
        name: "Tanvi Gade",
        role: "Student Coordinator",
        phone: "+91 91122 55667",
        image: "/team/students/tanvi.jpg",
      },
    ],
    teachers: [
      {
        name: "Prof. L. Desai",
        role: "Teacher Coordinator",
        image: "/team/teachers/ldesai.jpg",
      },
      {
        name: "Dr. R. Bhosale",
        role: "Teacher Coordinator",
        image: "/team/teachers/bhosale.jpg",
      },
    ],
  },
  {
    eventName: "Closing Ceremony",
    students: [
      {
        name: "Yash Kulkarni",
        role: "Student Coordinator",
        phone: "+91 90011 22334",
        image: "/team/students/yash.jpg",
      },
      {
        name: "Isha Patil",
        role: "Student Coordinator",
        phone: "+91 98800 77665",
        image: "/team/students/isha.jpg",
      },
    ],
    teachers: [
      {
        name: "Dr. S. Gokhale",
        role: "Teacher Coordinator",
        image: "/team/teachers/gokhale.jpg",
      },
      {
        name: "Prof. M. Kulkarni",
        role: "Teacher Coordinator",
        image: "/team/teachers/mkulkarni.jpg",
      },
    ],
  },
];

export default function MyTeam() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-16 mt-20 font-roman font-italic">
          Our{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent">
            Team
          </span>
        </h1>

        <div className="space-y-12">
          {teamData.map((event, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                {event.eventName}
              </h2>

              <div className="grid md:grid-cols-2 gap-10">
                <TeamGroup
                  title="Student Coordinators"
                  titleColor="text-yellow-400"
                  members={event.students}
                  showPhone
                />
                <TeamGroup
                  title="Teacher Coordinators"
                  titleColor="text-pink-400"
                  members={event.teachers}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamGroup({
  title,
  titleColor,
  members,
  showPhone = false,
}: {
  title: string;
  titleColor: string;
  members: Person[];
  showPhone?: boolean;
}) {
  return (
    <div>
      <h3 className={`text-xl font-semibold mb-4 ${titleColor}`}>{title}</h3>
      <div className="grid sm:grid-cols-2 gap-6">
        {members.map((person, index) => (
          <PersonCard key={index} person={person} showPhone={showPhone} />
        ))}
      </div>
    </div>
  );
}

function PersonCard({
  person,
  showPhone,
}: {
  person: Person;
  showPhone: boolean;
}) {
  return (
    <div className="bg-white/10 border border-white/10 rounded-xl p-4 text-center hover:bg-white/15 transition">
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/20">
        <Image
          src={person.image}
          alt={person.name}
          fill
          className="object-cover"
        />
      </div>

      <h4 className="text-white font-semibold">{person.name}</h4>
      <p className="text-white/60 text-sm">{person.role}</p>

      {showPhone && person.phone && (
        <p className="text-yellow-400 text-sm mt-1">{person.phone}</p>
      )}
    </div>
  );
}
