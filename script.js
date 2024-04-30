async function getData() {
  let res = await fetch(
    "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json"
  );
  let data = await res.json();
  console.log(data);
  return data;
}

let students = getData();
