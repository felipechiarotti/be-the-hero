const connection = require('..\\database\\connection');

module.exports = {
    async create(request, response){
        const {titulo, descricao, valor} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('casos').insert({
            titulo,
            descricao,
            valor,
            ong_id
        });

        return response.json({id});
    },

    async index(request, response){
        const { page =  1, limit = 5} = request.query;
        
        const [count]  = await connection('casos').count();
         
        const casos = await connection('casos')
        .join('ongs', 'ongs.id', '=', 'casos.ong_id')
        .limit(limit)
        .offset((page-1)*limit)
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email',
            'ongs.whatsapp',
            'ongs.city',
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(casos);
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id_auth = request.headers.authorization;

        const caso = await connection('casos')
        .where('id', id)
        .select('ong_id')
        .first();

        if(caso.ong_id !== ong_id_auth){
            return response.status(401).json({
                error: 'Operação não permitida'
            });
        }

        await connection('casos')
        .where('id',id)
        .delete();

        return response.status(204).send();
    }
}