import http from 'k6/http';
import { group, check } from 'k6';
import { SharedArray } from 'k6/data';

const users = new SharedArray('user.json', function () {
    return JSON.parse(open('./user.json')).user_valid;
});

export const options = {
    scenarios: {
        shared_iter_scenario: {
            executor: "shared-iterations",
            vus: 10,
            iterations: 100,
            startTime: "0s",
            tags: { users: 'users' },
        },
        per_vu_scenario: {
            executor: "per-vu-iterations",
            vus: 10,
            iterations: 10,
            startTime: "10s",
        },
    },
    thresholds: {
        http_req_failed: ['rate<0.01'],
        http_req_duration: ['p(90) < 400'],

    }
};

export default function () {
    const BASE = "http://localhost:8080/api";
    group('get all users', function () {
        const res = http.get(BASE + "/users");
        check(res, {
            'is status 200': res.status == 200
        }, { users: 'users' });
    });

    group("create a new user", () => {
        const user = users[0];
        const payload = JSON.stringify({
            name: user.username,
            surname: user.surname,
            name: user.name,
            lastname: user.lastname,
            email: user.email + Math.random(),
            password: user.password,
            bio: user.bio,
            site: user.site,
            urlImage: user.urlImage
        });
        const headers = { 'Content-Type': 'application/json' };
        const res = http.post(BASE + "/users", payload, {
            headers,
        });
        check(res, {
            'is status 201': res.status == 201,
            'is body not empty': res.json().length != 0,
            'is name valid': res.json().name = user.name
        });
        console.log(res.status)
    });
}
