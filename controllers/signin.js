const handleSignIn = (db, bcrypt) => (req,res) => {
    const { email, password } = req.body;
    db.select('email','hash').from('login')
        .where('email','=',req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            console.log(isValid);
            if (isValid){
                return db.select('*').from('users')
                    .where('email','=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json("unable to get user"))
            }
            else
                return res.status(400).json("wrong creds")
        })
        .catch(err => res.status(400).json("wrong creds"))

    // if(req.body.email === database.users[0].email &&
    //     req.body.password === database.users[0].password){
    //         res.json(database.users [0]);
    //     }
    // else{
    //     res.status(400).json('error');
    // }
}

module.exports = {
    handleSignIn
}