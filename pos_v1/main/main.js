'use strict';


function cartItems(inputs, allItems) {
  let countItems=[];

  for(let input of inputs){
    let spilredInput=input.split('-');
    let barcode=spilredInput[0];
    let count=parseFloat(spilredInput[1]||1);
    let countItem=countItems.find(countItem=>countItem.item.barcode===barcode);

    if(countItem){
      countItem.count++;
    }

    else{
      let item=allItems.find(item=>item.barcode===barcode);
      countItems.push({item, count});
    }

  }

  return countItems;
}


let buildReceiptItems=(cartItems,promotions)=>{
  return cartItems.map(cartItem=>{
    let promotionType=getPromotionType(cartItem.item.barcode,promotions);
    let {subtatol,saved}=discount(cartItem,promotionType);
    return{cartItem,subtatol,saved};
  })}

let getPromotionType=(barcode,promotions)=>{
  let promotion=promotions.find(promotion=>promotion.barcodes.includes(barcode));
  return promotion?promotion.type:'';
}

let discount=(cartItem,promotionType)=>{
  let freecount=0;
  if(promotionType==='BUY_TWO_GET_ONE_FREE'){
    freecount=parseInt(cartItem.count/3);

  }
  let saved=cartItem.item.price*freecount;
  let subtatol=cartItem.count*cartItem.item.price-saved;
  return{subtatol,saved};
}

let buildTatol=(Itemssubtatols)=>{
  let allSaved=0;
  let tatol=0;

  for(let Itemssubtatol of Itemssubtatols){
    allSaved+=Itemssubtatol.saved;
    tatol+=Itemssubtatol.subtatol;
  }

  let puts={Itemssubtatols,allSaved,tatol};

  return puts;
}


let toReceipt=(puts)=>{
  var receipt='***<没钱赚商店>收据***\n';

  for(let put of puts.Itemssubtatols){
    receipt+='名称：'+put.cartItem.item.name+'，数量：'+put.cartItem.count
      +put.cartItem.item.unit+'，单价：'+put.cartItem.item.price.toFixed(2)+'(元)，小计：'
      +put.subtatol.toFixed(2)+'(元)\n';

  }

  receipt+='----------------------\n'+'总计：'+puts.tatol.toFixed(2)+'(元)\n'+'节省：'+puts.allSaved.toFixed(2)+
    '(元)\n'+'**********************';

  return receipt;
}



