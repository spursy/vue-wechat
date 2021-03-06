import mongoose from 'mongoose'
import config from '../config'
import fs from 'fs'
import {resolve}  from 'path'

const models = resolve(__dirname, './schema')
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*js$/))
    .forEach(file => require(resolve(models, file)))

export const database = app => {
    mongoose.set('debug', true)
    console.log(`connect mongoodb`);

    mongoose.connect(config.db+ '/' + 'yiqigo' )
    
    mongoose.connection.on('disconnect', () => {
        // mongoose.createConnection('localhost', 'yiqigo', '27017')
    })

    mongoose.connection.on('error', err => {
        //not exists dbs, create a database
        console.log(`not exists dbs, create a database.`);
        mongoose.connect(config.db)
    })

    mongoose.connection.on('open', async => {
        console.error('Connected to MongoDB', config.db);
    })
}