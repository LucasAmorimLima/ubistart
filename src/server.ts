import app from './app'

app.listen(3333 || process.env.PORT, () => {
    console.log('App listening on port 3333')
})




