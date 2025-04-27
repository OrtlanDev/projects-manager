interface VerifyEmailData {
    user: {
        id: string;
        username: string;
        email: string;
        picture: string | null;
    };
    refresh: string;
    access: string;
}

export default VerifyEmailData;
