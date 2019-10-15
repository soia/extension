import { authHeader } from '../helpers';

export class MainService {
    getResource = async url => {
        const res = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
            headers: authHeader()
        });

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`);
        }
        // eslint-disable-next-line no-return-await
        return await res.json();
    };

    test = async () => {
        const res = await this.getResource(`/test`);
        return res;
    };
}
