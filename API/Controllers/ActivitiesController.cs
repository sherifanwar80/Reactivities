using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities(CancellationToken ct)
        {
            // return await _context.Activities.ToListAsync();
            return HandleResult(await Mediator.Send(new List.Query(), ct));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            //return await _context.Activities.FindAsync(id);
            // var result = await Mediator.Send(new Details.Query{ Id = id });
            return HandleResult(await Mediator.Send(new Details.Query{ Id = id }));
            // var activity = await Mediator.Send(new Details.Query{ Id = id });
            // if (activity == null)
            //     return NotFound();
            // return activity;
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            // return Ok(await Mediator.Send(new Create.Command{ Activity = activity }));
            return HandleResult(await Mediator.Send(new Create.Command{ Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            
            // return Ok(await Mediator.Send(new Edit.Command{ Activity = activity }));
            
            return HandleResult(await Mediator.Send(new Edit.Command{ Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            // return Ok(await Mediator.Send(new Delete.Command{ Id = id }));
            return HandleResult(await Mediator.Send(new Delete.Command{ Id = id }));
        }

    }
}