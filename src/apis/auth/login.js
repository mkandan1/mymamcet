import bcrypt from 'bcryptjs'

export const signInUser = async (email, password) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = bcrypt.hashSync(password, salt);

    fetch('http://localhost:3035/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    }).then((res) => { return res.json() })
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.error(err);
        })

}