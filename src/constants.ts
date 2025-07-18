export const genealogy = [
  "Abraham","Isaac","Jacob","Judah","Perez","Hezron","Ram","Amminadab",
  "Nahshon","Salmon","Boaz","Obed","Jesse","David","Solomon","Rehoboam",
  "Abijah","Asa","Jehoshaphat","Jehoram","Uzziah","Jotham","Ahaz","Hezekiah",
  "Manasseh","Amon","Josiah","Jeconiah","Shealtiel","Zerubbabel","Abiud",
  "Eliakim","Azor","Zadok","Akim","Eliud","Eleazar","Matthan","Jacob",
  "Joseph","Jesus"
];

export type Mode = "baby" | "easy" | "normal" | "hard" | "extreme";

type config = {
  lives: number;
  hint: "full" | "letters" | null;
  timer: boolean;
}

export const difficultyConfig: Record<Mode, config> = {
  baby: { lives: 3, hint: "full", timer: false },
  easy: { lives: 3, hint: "letters", timer: false },
  normal: { lives: 3, hint: null, timer: false },
  hard: { lives: 1, hint: null, timer: false },
  extreme: { lives: 1, hint: null, timer: true },
};