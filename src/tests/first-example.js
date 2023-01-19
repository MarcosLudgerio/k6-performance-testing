import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';


export const requests = new Counter('http_reqs');
export const options = {
    stages: [
        { target: 20, duration: '1m' },
        { target: 15, duration: '1m' },
        { target: 0, duration: '1m' },
    ],
    thresholds: {
        http_reqs: ['count < 100'],
    },
};
export default function () {
    const res = http.get('http://localhost:8080/api/users');
    sleep(1);

    res.submitForm();

    const checkRes = check(res, {
        'status is 200': (r) => r.status === 200,
        'response body': (r) => r.body.indexOf('Feel free to browse') !== -1,
    });
}
