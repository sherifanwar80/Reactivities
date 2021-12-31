using Application.Core;
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

        protected ActionResult HandleResult<T> (Result<T> result)
        {
            if (result == null) return NotFound();
            
            if (result.IsSuccess && result.Value != null)
                return Ok(result.Value);

            if (result.IsSuccess && result.Value == null)
                return NotFound();
                
            return BadRequest(result.Error);
        }
    }
}