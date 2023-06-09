using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class BasketController : BaseApiController
  {
    private readonly StoreContext _context;
    public BasketController(StoreContext context)
    {
      _context = context;
    }

    [HttpGet(Name = "GetBasket")]
    public async Task<ActionResult<BasketDTO>> GetBasket()
    {
      var basket = await RetrieveBasket();

      if (basket == null) return NotFound();

      return MapBasketToDTO(basket);
    }

    [HttpPost]
    public async Task<ActionResult<BasketDTO>> AddItemTobasket(int productId, int quantity)
    {
      var basket = await RetrieveBasket();

      if (basket == null) basket = CreateBasket();

      var product = await _context.Products.FindAsync(productId);

      if (product == null) return BadRequest(new ProblemDetails
      {
        Title = "Product not found",
      });
      
      basket.AddItem(product, quantity);

      var result = await _context.SaveChangesAsync() > 0;

      if (result) return CreatedAtRoute("GetBasket",MapBasketToDTO(basket));
      
      return BadRequest(new ProblemDetails
      {
        Title = "Failed to add item to basket",
      });
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
    {
      var basket = await RetrieveBasket();
      if(basket == null) return NotFound();

      basket.RemoveItem(productId, quantity);
      var result = await _context.SaveChangesAsync() > 0;

      if(result) return Ok();

      return BadRequest(new ProblemDetails
      {
        Title = "Problem removing item from basket",
      });
    }

    private async Task<Basket> RetrieveBasket()
    {
      return await _context.Baskets
          .Include(i => i.Items)
          .ThenInclude(p => p.Product)
          .FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);
    }

    private Basket CreateBasket()
    {
      var buyerId = Guid.NewGuid().ToString();
      var cookieOptions = new CookieOptions
      {
        Expires = DateTime.Now.AddDays(30),
        HttpOnly = true,
        IsEssential = true
      };
      Response.Cookies.Append("buyerId", buyerId, cookieOptions);
      var basket = new Basket { BuyerId = buyerId };
      _context.Baskets.Add(basket);
      return basket;
    }
    private BasketDTO MapBasketToDTO(Basket basket)
    {
      return new BasketDTO
      {
        Id = basket.Id,
        BuyerId = basket.BuyerId,
        Items = basket.Items.Select(item => new BasketItemDTO
        {
          ProductId = item.ProductId,
          Name = item.Product.Name,
          Price = item.Product.Price,
          PictureUrl = item.Product.PictureUrl,
          Type = item.Product.Type,
          Brand = item.Product.Brand,
          Quantity = item.Quantity
        }).ToList()
      };
    }

  }
}