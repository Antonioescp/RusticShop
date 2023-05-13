﻿namespace RusticShopAPI.Data.Models
{
    public class ProductVariant
    {
        public long Id { get; set; }
        public long ProductId { get; set; }
        public string SKU { get; set; } = null!;
        public decimal UnitPrice { get; set; }
        public bool IsPublished { get; set; }

        // Nav properties
        public Product? Product { get; set; }
        public ICollection<ProductVariantAttribute>? ProductVariantAttributes { get; set; }
        public ICollection<Attribute>? Attributes { get; set; }
        public ICollection<ProductImage>? Images { get; set; }
        public ICollection<Discount>? Discounts { get; set; }
        public ICollection<ProductVariantDiscount>? ProductVariantDiscounts { get; set; }
        public ICollection<Order>? Orders { get; set; }
        public ICollection<OrderDetail>? OrderDetails { get; set; }
        public ICollection<Purchase>? Purchases { get; set; } 
        public ICollection<PurchaseDetail>? PurchaseDetails { get; set; }
        public ICollection<Refund>? Refunds { get; set; }
        public ICollection<RefundDetail>? RefundDetails { get; set; }
        public ICollection<User>? CartUsers { get; set; }
        public ICollection<Cart>? Carts { get; set; }
        public ICollection<User>? WishlistedByUsers { get; set; }
    }
}
