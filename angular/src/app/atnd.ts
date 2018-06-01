export class User {
    id: number;
    attendanceNumber: number;
    userName: string;
    atnds: Atnd[];
}

export class Atnd {
    id: number;
    userId: number;
    date: string;
    atnd1: number;
    atnd2: number;
    atnd3: number;
    atnd4: number;
    atnd5: number;
    cameAt: string;
    leavedAt: string;
}

export class MgtInfo {
    dates: string[];
    users: User[];
    atnds: Atnd[];
}

export class Times {
    cameAt: string;
    leavedAt: string;
}
