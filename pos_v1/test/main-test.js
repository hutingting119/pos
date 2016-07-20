'use strict';


describe('pos', () => {

  describe('buildCountItems', () => {
    var inputs;
    var allItems = loadAllItems();
    beforeEach(() => {
      inputs = [
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000001',
        'ITEM000003-2',
        'ITEM000005',
        'ITEM000005',
        'ITEM000005'
      ];
    });

    it('should bulidAmounts correct test', ()=> {
      let countItems = cartItems(inputs, allItems);
      let test = [
        {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          count: 3
        }
      ];

      expect(countItems).toEqual(test);
    });
  });

  describe('buildItemsSubtatol', ()=> {
    var countItems;
    beforeEach(() => {
      countItems = [{
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
        {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          count: 3
        }
      ]
    })
    var Promotions=loadPromotions();


    it('should buildReceiptItems correct test', ()=> {
      let itemsSubtatol = buildReceiptItems(countItems,Promotions);
      let test = [{
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        subtatol: 12,
        saved:3
      },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          subtatol: 30,
          saved:0
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          },
          subtatol: 9,
          saved:4.5
        }]
      expect(itemsSubtatol).toEqual(test);
    })
  });

  describe('buildTatol',()=>{
    var Itemssubtatols;
    beforeEach(() => {
      Itemssubtatols = [{
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        subtatol: 12,
        saved:3
      },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          subtatol: 30,
          saved:0
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          },
          subtatol: 9,
          saved:4.5
        }]
    })
    it('should buildTatol correct test', ()=> {
      let puts=buildTatol(Itemssubtatols);
      let test= {
                Itemssubtatols : [{
                cartItem: {
                  item: {
                    barcode: 'ITEM000001',
                    name: '雪碧',
                    unit: '瓶',
                    price: 3.00
                  },
                  count: 5
                },
                subtatol: 12,
                saved: 3
              },
                {
                  cartItem: {
                    item: {
                      barcode: 'ITEM000003',
                      name: '荔枝',
                      unit: '斤',
                      price: 15.00
                    },
                    count: 2
                  },
                  subtatol: 30,
                  saved: 0
                },
                {
                  cartItem: {
                    item: {
                      barcode: 'ITEM000005',
                      name: '方便面',
                      unit: '袋',
                      price: 4.50
                    },
                    count: 3
                  },
                  subtatol: 9,
                  saved: 4.5
                }],
              tatol:51,
              allSaved:7.5
            }

      expect(puts).toEqual(test);
    });
  });

  describe('toReceipt', ()=> {
    var puts;
    beforeEach(() => {
      puts={
        Itemssubtatols : [{
          cartItem: {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          subtatol: 12,
          saved: 3
        },
          {
            cartItem: {
              item: {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15.00
              },
              count: 2
            },
            subtatol: 30,
            saved: 0
          },
          {
            cartItem: {
              item: {
                barcode: 'ITEM000005',
                name: '方便面',
                unit: '袋',
                price: 4.50
              },
              count: 3
            },
            subtatol: 9,
            saved: 4.5
          }],
          tatol:51,
        allSaved:7.5
      }
    })
    it('should toReceipt correct test', ()=> {
      let receipt=toReceipt(puts);
      let test=`***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;
      expect(receipt).toEqual(test);
    });
  });
/*
  let inputs;

  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', () => {




    spyOn(console, 'log');

    printReceipt(inputs);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });
*/
});
