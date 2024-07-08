using AutoMapper;
using RusticShopAPI.Data.Models;
using RusticShopAPI.Data.Models.DTOs;
using RusticShopAPI.Data.Models.DTOs.ProductDtos;

namespace RusticShopAPI.Services.AutoMapper
{
    public class ProductVariantMapperSettings : Profile
    {
        public ProductVariantMapperSettings()
        {
            CreateMap<ProductVariant, ProductVariantListItem>()
                .ForMember(pvl => pvl.Images, opt => opt.MapFrom(pv => pv.Images));
            CreateMap<PaginatedResult<ProductVariant>, PaginatedResult<ProductVariantListItem>>();
            CreateMap<ProductVariantAttribute, ProductVariantAttributeDto>();
            CreateMap<ProductImage, ProductImageFeaturedDto>();
            CreateMap<ProductVariantDiscount, ProductVariantDiscountFeaturedDto>();
            CreateMap<ProductVariant, ProductVariantFeaturedDto>();
        }
    }
}
