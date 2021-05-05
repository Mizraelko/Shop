const uuid = require('uuid');
const path = require('path');
const {Device, DeviceInfo} = require('../../models/models');
const apiError = require('../../errors/apiError');

class DeviceController {
  
  async create(req, res, next) {
    try {
    const {name, price, brandId, typeId, info} = req.body;
    const { img } = req.files
    let fileName = uuid.v4() + '.jpg';
    img.mv(path.resolve(__dirname, '..', '..', 'static', fileName));
    const device = await Device.create({name, price, brandId, typeId, img: fileName});
      if (info) {
        info = JSON.parse(info);
        info.i.forEach(i => {
          DeviceInfo.create({

            title: i.title,
            description: i.description,
            deviceId: device.id
          })
        });
      }

    
    return res.json(device);
    } catch (e) {
      next(apiError.badRequest(e.message));
    }
  }
  async getOne(req, res) {
    const {id} = req.params;
    const device = await Device.findOne(
      {
      where: {id},
      include: [{model: DeviceInfo, as: 'info'}]
    }
    )
    return res.json(device);

  }
  async getAll(req, res) {
      const { brandId, typeId, limit, page} = req.query;

      page = page || 1;
      limit = linit || 9;
      let offset = page * limit - limit;
      let devices;
      if(!brandId && !typeId) {
        devices = await Device.findAndCountAll({limit, offset});
      }
      if(brandId && !typeId) {
        devices = await Device.findAndCountAll({where: {brandId}, limit, offset});
      }
      if(!brandId && typeId) {
        devices = await Device.findAndCountAll({where: {typeId}}, limit, offset);
      }
      if(brandId && typeId) {
        devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset});
      }
      return res.json(devices);
  }
  async deleteDevice(req, res) {
    const {name} = req.body;

    const device = await Device.findOne({where: {name}});
    


  }
}

module.exports = new DeviceController();
