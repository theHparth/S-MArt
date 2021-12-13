(function($) {
	// Let's start writing AJAX calls!

	var mySearchForm = $('#search-form'),
		searchInput = $('#search-bar');
	var newContent = $('#new-content');

	mySearchForm.submit(function(event) {
		event.preventDefault();

		// console.log('start ajax request');
		var search = searchInput.val();

		if (search) {
			var useJson = false;
			if (useJson) {
				var requestConfig = {
					method: 'POST',
					url: '/shop/search',
					contentType: 'application/json',
					data: JSON.stringify({
						search: search
					})
				};

				$.ajax(requestConfig).then(function(responseMessage) {
					// console.log(responseMessage);
					newContent.html(responseMessage);
				});
			} else {
				var requestConfig = {
					method: 'POST',
					url: '/shop/search.html',
					contentType: 'application/json',
					data: JSON.stringify({
						search: search
					})
				};

				$.ajax(requestConfig).then(function(responseMessage) {
					// console.log(responseMessage);
					newContent.html(responseMessage);
				});
			}
		}
	});
})(window.jQuery);



// router.post("/search.html", async (req, res) => {
//     const body = req.body;
//     try {
//       let productList = await product.getProductsViaSearch(body.search);
//       var user = req.session.user;
//       let newProductList = [];
//         for (product of productList) {
//           if (product.reviews&&product.reviews.length > 0) {
//               product.rated = true;
//           } else {
//               product.rated = false;
//           }
//           newProductList.push(product);
//         }
      
//       if (productList.length > 0) {
//         res.status(200).render("productList", { allProducts: productList,
//             userId: user});
//       } else {
//         res.status(200).render("productList", { allProducts: [],
//             userId: user});
//       }
//     } catch (e) {
//       console.log(e);
//       res.status(500).send();
//     }
//   })