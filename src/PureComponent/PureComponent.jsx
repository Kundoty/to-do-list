const isEqual = (objA, objB) => {
  if (objA === objB) return true;
  if (
    typeof objA !== "object" ||
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  )
    return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
};

class PureComponent extends React.Component {
  shouldComponentUpdate(newProps, newState) {
    return !isEqual(this.props, newProps) || !isEqual(this.state, newState);
  }
}

const courseCatalog = [
  {
    department: "Computer Science",
    courses: [
      { code: "CS101", title: "Intro to Programming", credits: 3 },
      { code: "CS201", title: "Data Structures", credits: 4 },
    ],
    faculty: {
      chair: "Dr. Smith",
      office: "Room 101",
    },
  },
  {
    department: "Mathematics",
    courses: [
      { code: "MATH101", title: "Calculus I", credits: 4 },
      { code: "MATH201", title: "Linear Algebra", credits: 3 },
    ],
    faculty: {
      chair: "Dr. Allen",
      office: "Room 202",
    },
  },
];

const modifiedCourseCatalog1 = courseCatalog.map((catalog) => {
  if (catalog.department === "Mathematics") {
    return { ...catalog, department: "Applied Math" };
  }
  return catalog;
});

const modifiedCourseCatalog2 = courseCatalog.map((catalog) => {
  const newCourse = { code: "CS301", title: "Algorithms", credits: 4 };
  if (catalog.department === "Computer Science") {
    return { ...catalog, courses: [...catalog.courses, newCourse] };
  }
  return catalog;
});

const modifiedCourseCatalog3 = courseCatalog.map((catalog) => {
  if (catalog.department === "Mathematics") {
    const filteredCourses = catalog.courses.filter(
      (course) => course.title !== "Linear Algebra"
    );
    return { ...catalog, courses: filteredCourses };
  }
  return catalog;
});

const modifiedCourseCatalog4 = courseCatalog.map((catalog) => {
  if (catalog.faculty.chair === "Dr. Smith") {
    return { ...catalog, faculty: { ...catalog.faculty, office: "Room 111" } };
  }
  return catalog;
});
