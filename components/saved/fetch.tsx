export const GetSaves = async (token: string) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  // @ts-ignore
  const res = await fetch("http://localhost:8088/api/v1/saves", requestOptions)
    .then(res => res.json())
    .then(res => {
      return res
    })
    .catch(error => console.log('error', error));
  return res
}