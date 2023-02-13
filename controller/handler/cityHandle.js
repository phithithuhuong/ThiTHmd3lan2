const fs = require("fs");
const cityService = require('../../service/cityService')
const qs = require('qs')
const url = require("url");
class CityHandle {
    static getList(cities,listCityHtml){
        let tbody ='';
        cities.forEach((city,index)=>{
            tbody+= `
               <tr>
                     <th scope="row">${index+1}</th>
                     <td><a href="/detail?id=${city.id}">${city.ten}</a></td>
                     <td>${city.quocgia}</td>
                     <td><a href="/edit?id=${city.id}">Update</a></td>
                     <td><a href="/delete?id=${city.id}" onclick="return confirm('Are you sure  want to delete this city?')">Delete</a></td>
                     </tr>
            `
        });
        listCityHtml = listCityHtml.replace('{city}',tbody);
        return listCityHtml

    }
    static showList(req,res){
        fs.readFile('./views/list.html','utf-8',async (err,listCitiesHtml)=>{
            if (err){
                console.log(err)
            }
            let city = await cityService.showCity()
            listCitiesHtml =await CityHandle.getList(city,listCitiesHtml);
            res.writeHead(200,'text/html')
            res.write(listCitiesHtml);
            res.end()
        })


    }
    static create(req,res){
        if (req.method==="GET"){
            fs.readFile('./views/create.html','utf-8',async (err,createHtml)=>{
                if (err){
                    console.log(err)
                }
                res.writeHead(200,'text/html')
                res.write(createHtml);
                res.end()
            })
        }else {
            let  data ='';
            req.on('data',chunk=>{
                data+=chunk
            });
            req.on('end',async ()=>{
                let city = qs.parse(data);
                await cityService.create(city);
                res.writeHead(301,{Location : '/list'});
                res.end()
            })
        }

    }
    static async remove(req, res) {
        let query = url.parse(req.url, true).query;
        let id = qs.parse(query).id;
        console.log(id)
        await cityService.remove(id);
        res.writeHead(301, {Location: '/list'});
        res.end();


    };
    static async edit(req, res, id) {
        let query = url.parse(req.url, true).query;
        id = qs.parse(query).id;
        if (req.method === "GET") {
           fs.readFile('./views/edit.html','utf-8',async (err, editHtml)=>{
               res.writeHead(200, 'text/html');
               let city = await cityService.findId(id)
               editHtml = editHtml.replace('{ten}', city[0].ten)
               editHtml = editHtml.replace('{id}', city[0].id)
               editHtml = editHtml.replace('{quocgia}', city[0].quocgia)
               editHtml = editHtml.replace('{dientich}', city[0].dientich)
               editHtml = editHtml.replace('{danso}', city[0].danso)
               editHtml = editHtml.replace('{gdp}', city[0].gdp);
               editHtml = editHtml.replace('{mota}', city[0].mota);
               res.write(editHtml);
               res.end();
           });

        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk
            });
            req.on('end', async () => {
                let product = qs.parse(data);
                await cityService.edit(product, id)
                res.writeHead(301,{Location : '/list'});
                res.end();
            })
        }
    };
    static getDetail(cities,listCityHtml){
        let tbody ='';
        cities.forEach((city,index)=>{
            tbody+= `
               <tr>
                     <th scope="row">${index+1}</th>
                     <td>${city.ten}</td>
                     <td>${city.quocgia}</td>
                     <td>${city.dientich}</td>
                     <td>${city.danso}</td>
                     <td>${city.gdp}</td>
                     <td>${city.mota}</td>
                     <td><a href="/list">thoat</a></td>
    
                     </tr>
            `
        });
        listCityHtml = listCityHtml.replace('{city}',tbody);
        return listCityHtml

    }
    static detail(req,res,id){
        let query = url.parse(req.url, true).query;
         id = qs.parse(query).id;
        fs.readFile('./views/list.html','utf-8',async (err,detailHtml)=> {
            if (err) {
                console.log(err)
            }
            let city = await cityService.detail(id)
           detailHtml = await CityHandle.getDetail(city,detailHtml)
            res.writeHead(200, 'text/html')
            res.write(detailHtml);
            res.end()
        })

    }
};
module.exports= CityHandle