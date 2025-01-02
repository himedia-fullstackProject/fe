export default function errorDisplay(err) {
  if (err.code === "ECONNABORTED") {
      return "응답시간 초과";
  } else if (err.response) {
      console.log("서버에러");
      console.log(err.response.status);
      console.log(err.response.data);
      return `서버 오류: ${err.response.status}`;
  } else if (err.request) {
      console.log("클라이언트 오류");
      return "클라이언트 오류 발생";
  } else {
      return err.message;
  }
}
