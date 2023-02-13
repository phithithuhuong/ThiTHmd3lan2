const cityHandle = require('./handler/cityHandle')

const router = {
    '/list': cityHandle.showList,
    '/create':cityHandle.create,
    '/delete': cityHandle.remove,
    '/edit': cityHandle.edit,
    '/detail' : cityHandle.detail,
};
module.exports = router