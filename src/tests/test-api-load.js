import { check } from 'k6';
import http from 'k6/http';
import { SharedArray } from 'k6/data';

const users = new SharedArray('users.json', function () {
    return JSON.parse(open('./users.json')).users;
});

export const options = {};

export default function () {
    const user = users[Math.floor(Math.random() * users.length)];
    const payload = JSON.stringify({
        name: user.username,
        surname: user.surname,
    });
    const headers = { 'Content-Type': 'application/json' };
    const res = http.post('https://httpbin.test.k6.io/post', payload, {
        headers,
    });

    check(res, {
        'Post status is 200': (r) => res.status === 200,
        'Post Content-Type header': (r) => res.headers['Content-Type'] === 'application/json',
        'Post response name': (r) => res.status === 200 && res.json().json.name === user.username,
    });

    if (res.status === 200) {
        // enters only successful responses
        // otherwise, it triggers an exception
        const delPayload = JSON.stringify({ name: res.json().json.name });
        http.patch('https://httpbin.test.k6.io/patch', delPayload, { headers });
    }
}
