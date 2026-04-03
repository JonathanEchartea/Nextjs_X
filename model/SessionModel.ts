export default interface SessionModel {
    userId: string;
    name: string;
    email: string;
    role: string;
    expiresAt?: Date;
}
