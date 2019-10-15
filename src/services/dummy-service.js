export class DummyService {
    studios = [
        {
            id: 1,
            number: '1',
            description:
                'Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet.',
            img: 'https://i.ibb.co/0FNW07f/G20-0047.png',
            cost: '450'
        },
        {
            id: 2,
            number: '2',
            description:
                'Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet.',
            img: 'https://i.ibb.co/86H7CMg/Interior-recording-studio-035447.png',
            cost: '700'
        },
        {
            id: 3,
            number: '3',
            description:
                'Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet.',
            img: 'https://i.ibb.co/0FNW07f/G20-0047.png',
            cost: '500'
        }
    ];

    training = [
        {
            id: 1,
            number: '1',
            description:
                'Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet.',
            img: 'https://i.ibb.co/4WnxD98/image.png'
        },
        {
            id: 2,
            number: '2',
            description:
                'Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur orem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet.',
            img: 'https://i.ibb.co/swBD17K/AC1-A8866-e1514997116147.png'
        }
    ];

    synthesizer = [
        {
            id: 1,
            description: 'Синтезатор Yamaha PSR-E263',
            img: 'https://i.ibb.co/kgqDPKR/sintezator-yamaha-montage-6-montage6-2151-0-3.png'
        },
        {
            id: 2,
            description: 'Синтезатор Yamaha PSR-E263',
            img: 'https://i.ibb.co/kgqDPKR/sintezator-yamaha-montage-6-montage6-2151-0-3.png'
        },
        {
            id: 3,
            description: 'Синтезатор Yamaha PSR-E263',
            img: 'https://i.ibb.co/kgqDPKR/sintezator-yamaha-montage-6-montage6-2151-0-3.png'
        },
        {
            id: 4,
            description: 'Синтезатор Yamaha PSR-E263',
            img: 'https://i.ibb.co/kgqDPKR/sintezator-yamaha-montage-6-montage6-2151-0-3.png'
        },
        {
            id: 5,
            description: 'Синтезатор Yamaha PSR-E263',
            img: 'https://i.ibb.co/kgqDPKR/sintezator-yamaha-montage-6-montage6-2151-0-3.png'
        },
        {
            id: 6,
            description: 'Синтезатор Yamaha PSR-E263',
            img: 'https://i.ibb.co/kgqDPKR/sintezator-yamaha-montage-6-montage6-2151-0-3.png'
        }
    ];

    getAllStudios() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.studios);
            }, 100);
        });
    }

    getAllEducations() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.training);
            }, 100);
        });
    }

    getAllEquipment() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.synthesizer);
            }, 100);
        });
    }
}
