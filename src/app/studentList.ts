export const students: Student[] = [
    {
      id: 1,
      fName: "Mark",
      lName: "William",
      mobile: 5462829,
      email: "ahdhghs@sanfkm",
      nic: "1453834567V",  },
    {
      id: 2,
      fName: "Zeke",
      lName: "Anthony",
      mobile: 54628647,
      email: "zeke@sanfkm",
      nic: "857625235V"
    }
  ];


  export interface Student {
    id: number;
    fName: string;
    lName: string;
    mobile: number;
    email: string;
    nic: string;
  }
  