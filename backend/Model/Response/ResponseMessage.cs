namespace backend.Model.Response
{
    public class ResponseMessage
    {
        public object data { get; set; }
        public int statusCode { get; set; }
        public bool isSuccess { get; set; } = true;
        public string message { get; set; }

        public void SetFault(Exception e, int statusCode)
        {
            this.statusCode = statusCode;
            this.message = e.Message;
            this.isSuccess = false;
        }
    }
}
