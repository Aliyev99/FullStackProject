using Microsoft.AspNetCore.Mvc;

namespace GoldStoreAPI.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _environment;

        public ExceptionMiddleware(RequestDelegate next, IHostEnvironment environment)
        {
            _next = next;
            _environment = environment;
        }


        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {

                context.Response.StatusCode = 500;
                context.Response.ContentType = "application/json";
                var problem = new ProblemDetails
                {
                    Status = 500,
                    Title = "Server error",
                    Detail = _environment.IsDevelopment() ? ex.StackTrace : null
                };

                await context.Response.WriteAsJsonAsync(problem);
            }
            

           
        }

    }
}
