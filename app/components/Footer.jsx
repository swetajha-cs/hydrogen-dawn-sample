import { useMatches, NavLink } from '@remix-run/react';

export function Footer({ menu }) {
  return (
    <footer className="footer">
      <FooterMenu menu={menu} />
    </footer>
  );
}

function FooterMenu({ menu }) {
  const [root] = useMatches();
  const publicStoreDomain = root?.data?.publicStoreDomain;
  return (
    <nav className="footer-menu page-width" role="navigation">

      <div className='footer__blocks-wrapper grid' >
        {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
          if (!item.url) return null;
          // if the url is internal, we strip the domain
          const url =
            item.url.includes('myshopify.com') ||
              item.url.includes(publicStoreDomain)
              ? new URL(item.url).pathname
              : item.url;
          const isExternal = !url.startsWith('/');
          return isExternal ? (
            <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
              {item.title}
            </a>
          ) : (
            <div className='footer-block' key={item.id}>
              <NavLink
                end
                key={item.id}
                prefetch="intent"
                to={url}
              >
                <h2>{item.title}</h2>
              </NavLink>
              {item.items.length > 0 && (
                <ul>
                  {item.items.map(child => (
                    <MenuItem item={child} key={child.id}/>
                  ))}
                </ul>
              )}

            </div>
          );
        })}
        <div className='footer-block'>
          <h2>Our mission</h2>
          <p>Quality materials, good designs, craftsmanship and sustainability.</p>
        </div>
      </div>

    </nav>
  );
}

function MenuItem({ item }) {
  if (!item.url) return null;
  const url =
    item.url.includes('myshopify.com') ||
      item.url.includes(publicStoreDomain)
      ? new URL(item.url).pathname
      : item.url;
  return (
    <NavLink
      end
      key={item.id}
      prefetch="intent"
      to={url}
    >
      <li key={item.id}>{item.title}</li>
    </NavLink>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
      items: [],
    },
  ],
};

// function activeLinkStyle({isActive, isPending}) {
//   return {
//     fontWeight: isActive ? 'bold' : '',
//     color: isPending ? 'grey' : 'white',
//   };
// }
