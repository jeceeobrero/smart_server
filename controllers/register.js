const handleRegister = (db, bcrypt) => (req,res) => {
    const { name, email, password } = req.body;
    
    if(!email || !password)
        return res.status(400).json('incorrect form submission');

    const hash = bcrypt.hashSync(password);
    console.log(email);
        db.transaction(trx => {
            db('login').transacting(trx).insert({
                hash: hash,
                email: email
            })
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                .returning('*')
                .insert({
                    email: loginEmail[0], 
                    name: name,
                    joined: new Date()
                }).then(user => {
                    res.json(user[0]);
                })
            }) 
            .then(trx.commit)
            .catch(trx.rollback)
        })       
        .catch(err => res.status(400).json("unable to register"))
}

module.exports = {
    handleRegister
}