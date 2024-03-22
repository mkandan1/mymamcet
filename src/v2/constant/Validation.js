class Validation {
    static email(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static password(password) {
        return password.length >= 4;
    }

    static phone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    }
}

export default Validation;
