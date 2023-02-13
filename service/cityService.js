const connection = require('../model/connection');
connection.connecting();
let connect = connection.getConnect()

class cityService {
    static showCity() {
        return new Promise((resolve, reject) => {
            let sql = `SELECT *
                       FROM thanhpho`;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })

        })


    };
    static detail(id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT *
                       FROM thanhpho where id = ${id}`;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })

        })

    };
    static create(city) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO city.thanhpho (ten, quocgia, dientich, danso, gdp, mota)
                       VALUES ('${city.ten}',
                               '${city.quocgia}', ${city.dientich}, ${city.danso}, ${city.gdp} ,'${city.mota}')`;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })

        })


    }

    static remove(id) {
        return new Promise((resolve, reject) => {
            let sql = ` DELETE
                        FROM city.thanhpho
                        WHERE id = ${id}`;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

    }


    static edit(city, id) {
        return new Promise((resolve, reject) => {
            let sql = ` UPDATE city.thanhpho t
                        SET t.ten        = '${city.ten}',
                            t.quocgia         = '${city.quocgia}',
                            t.dientich       = ${city.dientich},
                            t.danso = ${city.danso} ,
                            t.gdp = ${city.gdp},
                            t.mota = '${city.mota}'
                        WHERE t.id = ${id} `;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
    static findId(id){
        return new Promise((resolve, reject) => {
            let sql = ` SELECT *
                        FROM city.thanhpho
                        WHERE id = ${id}`;
            connect.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })


    }
};
module.exports = cityService