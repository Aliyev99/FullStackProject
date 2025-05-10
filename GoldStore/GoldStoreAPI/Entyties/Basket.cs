using GoldStoreAPI.Entyties.Products;

namespace GoldStoreAPI.Entyties
{
    public class Basket
    {

        public int Id { get; set; }

        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();


        public void AddItem(Product product, int quantity, string size)
        {
            
            //var item = Items.FirstOrDefault(x => x.ProductId == product.Id && x.Product.Size == product.Size);

            var item = Items.FirstOrDefault(x => x.ProductId == product.Id && x.SelectedSize == size);
            if (item == null)
            {
                var newItem = new BasketItem { Product = product, Quantity = quantity, SelectedSize = size };   
                Items.Add(newItem);
            }
            else
            {
                item.Quantity += quantity;
            }
        }


        public void RemoveItem(Product product, int quantity, string size)
        {
            //var item = Items.FirstOrDefault(x => x.ProductId == product.Id && x.Product.Size == product.Size);

            var item = Items.FirstOrDefault(x => x.ProductId == product.Id && x.SelectedSize == size);

            if (item != null)
            {
                item.Quantity -= quantity;


                if(item.Quantity <= 0)
                {
                   Items.Remove(item);
                } 
            }
        }
    }
}
