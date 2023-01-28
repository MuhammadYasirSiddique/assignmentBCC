//export
class Student {
    name: string;
    id: number;
    courses: Course[];

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
        this.courses = [];
    }

    registerForCourse(course: Course) {
        this.courses.push(course);
    }
}

class Fee extends Student{
    feeAmount: number;
    feeMonth: string;
    studentId: number;
    feeRecords: object[];

    constructor(name: string, id: number) {
        super(name, id);
        this.studentId = id;
        this.feeRecords = [];
    }

    inputFee(amount: number, month: string) {
        this.feeAmount = amount;
        this.feeMonth = month;
        this.feeRecords.push({studentId: this.studentId, amount: this.feeAmount, month: this.feeMonth});
    }

    getFeeRecord(studentId: number) {
        let records = this.feeRecords.filter((record) => record.studentId === studentId);
        return records;
    }
}

class Course {
    title: string;
   code: string;
    students: Student[] = [];

   constructor(title: string, code: string) {
       this.title = title;
       this.code = code;
   }

   addStudent(student: Student) {
       this.students.push(student);
   }

   getStudents() {
       return this.students;
   }
}

class StudentManagementSystem {
    students: Student[];
    courses: Course[];

    constructor() {
        this.students = [];
        this.courses = [];
    }

    addStudent(name: string, id: number): Student {
        let student = new Fee(name, id);
        this.students.push(student);
        return student;
    }

    registerStudentForCourse(student: Student, course: Course) {
        student.registerForCourse(course);
    }

    addCourse(title: string, code: string): Course {
        let course = new Course(title, code);
        this.courses.push(course);
        return course;
    }
}


let sms = new StudentManagementSystem();
let student1 = sms.addStudent("John", 123);
let student2 = sms.addStudent("Jane", 456);
let course1 = sms.addCourse("Math", "MTH101");
let course2 = sms.addCourse("English", "ENG101");

sms.registerStudentForCourse(student1, course1);
sms.registerStudentForCourse(student1, course2);
sms.registerStudentForCourse(student2, course1);

console.log("Student 1 registered courses:")
student1.courses.forEach((course) => {
    console.log(course.title);
});

console.log("\nStudent 2 registered courses:")
student2.courses.forEach((course) => {
    console.log(course.title);
});

student1.inputFee(1000, "January");
student1.inputFee(2000, "February");
student2.inputFee(3000, "January");

console.log("\nStudent 1 fee records:")
let student1FeeRecords = student1.getFeeRecord(student1.studentId);
student1FeeRecords.forEach((record) => {
    console.log(`Amount: ${record.amount}, Month: ${record.month}`);
});

console.log("\nStudent 2 fee records:")
let student2FeeRecords = student2.getFeeRecord(student2.studentId);
student2FeeRecords.forEach((record) => {
    console.log(`Amount: ${record.amount}, Month: ${record.month}`);
});
