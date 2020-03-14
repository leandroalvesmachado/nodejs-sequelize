const User = require('../models/User');
const Tech = require('../models/Tech');

module.exports = {
    async index(req, res) {
        const { user_id } = req.params;
        const user = await User.findByPk(user_id, {
            include: { association: 'techs' }
        });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // only user techs
        // return res.json(user.techs);

        // user with techs
        return res.json(user);
    },
    async store(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // tenta procurar uma tech, se ela não existir, ele cria uma nova tech
        // method retorna um array [ tech, true or false ]
        const [ tech ] = await Tech.findOrCreate({
            where: { name }
        });

        // https://sequelize.org/master/manual/assocs.html
        // metodos que ajudam, ele cria um metodo que ajuda
        await user.addTech(tech);

        return res.json(tech);
    },
    async delete(req, res) {
        const { user_id } = req.params;
        const { name } = req.body;

        const user = await User.findByPk(user_id);

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Procurando uma tech pelo name
        const tech = await Tech.findOne({
            where: { name }
        });

        // metodo criado automatico para deletar
        await user.removeTech(tech);

        return res.json();
    }
}