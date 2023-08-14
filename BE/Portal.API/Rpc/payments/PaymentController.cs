using Common.Dtos.Page;
using Common.Dtos.Payment;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.patientrecord;
using Portal.Application.Interfaces.Payment;

namespace Portal.API.Rpc.payments
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }
        [Route(PaymentRoot.Create), HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUpdatePayment request)
        {
            var create = await _paymentService.Create(request);
            return Ok(create);
        }
        [Route(PaymentRoot.CreateList), HttpPost]
        public async Task<IActionResult> CreateList([FromBody] KeyValuePair<Guid,List<Guid>> request)
        {
            var create = await _paymentService.CreateList(request);
            return Ok(create);
        }
        [Route(PaymentRoot.Delete), HttpDelete]
        public async Task<IActionResult> Delete(Guid Id)
        {
            var create = await _paymentService.Delete(Id);
            return Ok(create);
        }

    }
}
