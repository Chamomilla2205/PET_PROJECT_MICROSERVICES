import bcrypt from 'bcrypt';

export class Password {
    static async toHash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(5);
        return bcrypt.hash(password, salt);
    };

    static compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
        return bcrypt.compare(suppliedPassword, storedPassword);
    };
}
