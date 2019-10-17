class DummyService {
    history = [
        {
            date: '1220432000',
            data: [
                {
                    id: '1',
                    status: 'CONFIRM',
                    action: 'SENT',
                    cryptoAmount: '-0.01',
                    moneyQuantity: '0.86',
                    copy: 'https://etherscan.io/tx/',
                    explorer: 'someLink',
                    fromAddress: '0x476ekjew4395a620f633bb57717',
                    toAddress: '0xf94034543nj5b34j5a15ddfd4becf6c',
                    txFee: '0.000189',
                },
                {
                    id: '2',
                    status: 'FAILED',
                    action: 'DEPOSIT',
                    cryptoAmount: '42',
                    moneyQuantity: '0.86',
                    copy: 'https://etherscan.io/tx/',
                    explorer: 'someLink',
                    fromAddress: '0x476ekjew4395a620f633bb57717',
                    toAddress: '0xf94034543nj5b34j5a15ddfd4becf6c',
                    txFee: '0.000189',
                },
            ],
        },
        {
            date: '1220832000',
            data: [
                {
                    id: '3',
                    status: 'PENDING',
                    action: 'DEPOSIT',
                    cryptoAmount: '245',
                    moneyQuantity: '0.86',
                    copy: 'https://etherscan.io/tx/',
                    explorer: 'someLink',
                    fromAddress: '0x476ekjew4395a620f633bb57717',
                    toAddress: '0xf94034543nj5b34j5a15ddfd4becf6c',
                    txFee: '0.000189',
                },
                {
                    id: '4',
                    status: 'FAILED',
                    action: 'SENT',
                    cryptoAmount: '-34',
                    moneyQuantity: '0.86',
                    copy: 'https://etherscan.io/tx/',
                    explorer: 'someLink',
                    fromAddress: '0x476ekjew4395a620f633bb57717',
                    toAddress: '0xf94034543nj5b34j5a15ddfd4becf6c',
                    txFee: '0.000189',
                },
                {
                    id: '5',
                    status: 'CONFIRM',
                    action: 'DEPOSIT',
                    cryptoAmount: '104',
                    moneyQuantity: '0.86',
                    copy: 'https://etherscan.io/tx/',
                    explorer: 'someLink',
                    fromAddress: '0x476ekjew4395a620f633bb57717',
                    toAddress: '0xf94034543nj5b34j5a15ddfd4becf6c',
                    txFee: '0.000189',
                },
            ],
        },
    ];

    getAllHistory() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(this.history);
            }, 100);
        });
    }
}

export default DummyService;
