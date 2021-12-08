using Microsoft.AspNetCore.Mvc;

//this function created to inherit from not to repeat the attributes [ApiController]/[Route("[controller]")]
namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        
    }
}