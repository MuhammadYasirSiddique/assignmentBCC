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

    getname(): string {
        return this.name
    }
}

interface FeeRecord {
    studentId: number;
    amount: number;
    month: string;
}

class Fee extends Student{
    feeAmount: number;
    feeMonth: string;
    studentId: number;
    feeRecords: FeeRecord[];

    constructor(name: string, id: number) {
        super(name, id);
        this.studentId = id;
        this.feeRecords = [];
    }

    inputFee(id:number, amount: number, month: string) {
        this.feeAmount = amount;
        this.feeMonth = month;
        this.feeRecords.push({studentId: this.studentId, amount: this.feeAmount, month: this.feeMonth});
    }
    
    public getFeeRecord(studentId: number) {
        let records = this.feeRecords.filter((record:FeeRecord) => record.studentId === studentId);
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

    getStudentList(): string[] {
        return this.students.map(student=> student.name);
    }   
}


let sms = new StudentManagementSystem();
let student1 = sms.addStudent("Yasir", 123) as Fee;
let student2 = sms.addStudent("Nasir", 456) as Fee;
let student3 = sms.addStudent("Jafar", 2255) as Fee;
let course1 = sms.addCourse("Internet of Things", "IOT101");
let course2 = sms.addCourse("Blockchain", "BCC102");
let course3 = sms.addCourse("Artificial Intelligence", "AIC103")

sms.registerStudentForCourse(student1, course1);
sms.registerStudentForCourse(student1, course2);
sms.registerStudentForCourse(student1, course3);
sms.registerStudentForCourse(student2, course1);

console.log(`${student1.name} registered courses`)
student1.courses.forEach((course) => {
    console.log(course.title);
});

console.log(`\n${student2.name} registered courses:`)
student2.courses.forEach((course) => {
    console.log(course.title);
});

student1.inputFee(1, 1000, "January");
student1.inputFee(2, 2000, "February");
student2.inputFee(3, 3000, "January");

console.log(`\n${student1.name}  fee records:`)
let student1FeeRecords = student1.getFeeRecord(student1.studentId);
student1FeeRecords.forEach((record) => {
    if ('amount' in record  &&'month' in record) {
        console.log(`Amount: ${record.amount}, Month: ${record.month}`);
    }
});

console.log(`\n ${student2.name} fee records:`)
let student2FeeRecords = student2.getFeeRecord(student2.studentId);
student2FeeRecords.forEach((record) => {
    if ('amount' in record && 'month' in record) {
        console.log(`Amount: ${record.amount}, Month: ${record.month}`);
    }
});

console.log("\n List of registered students")
console.log(sms.getStudentList());