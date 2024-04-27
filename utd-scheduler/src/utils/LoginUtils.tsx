import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export function hashPassword(password: string) {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
}

export function verifyPassword(password: string, hashedPassword: string) {
    return compareSync(password, hashedPassword);
}