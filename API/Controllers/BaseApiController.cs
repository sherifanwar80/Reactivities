using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

//this function created to inherit from not to repeat the attributes [ApiController]/[Route("[controller]")]
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        // protected IMediator Mediator => HttpContext.RequestServices.GetService<IMediator>();
    }
}