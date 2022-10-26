import config from '../config';

const setInterval = async (interval) => {

  const res = await fetch(`${config.SOCKET_URL}/set-interval`, {
    method: "POST",
    body: JSON.stringify({
        interval,
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
  });

  const data = await res.json();
}

export default setInterval;
