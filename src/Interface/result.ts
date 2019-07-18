interface Result<T> {
  code: number;
  content: T;
  message: string;
}
export default Result;
