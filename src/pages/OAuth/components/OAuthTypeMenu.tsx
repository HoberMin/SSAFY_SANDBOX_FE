import * as React from 'react';

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTokenTypeStore } from '@/store';

type Checked = DropdownMenuCheckboxItemProps['checked'];
type DropdownMenuItemsType = string[];

const dropdownMenuItems: DropdownMenuItemsType = [
  'Cookie/Authorization',
  'Cookie/Cookie',
  'Custom Header/Authorization Header',
];

export const OAuthTypeMenu = () => {
  const { tokenType, setTokenType } = useTokenTypeStore();

  const [isSelected, setIsSelected] = React.useState<Checked[]>([
    true,
    false,
    false,
  ]);

  React.useEffect(() => {
    setIsSelected(prev => prev.map((_, index) => index === tokenType));
  }, []);

  const handleTokenType = (changedTokenType: number) => {
    setTokenType(changedTokenType);
    setIsSelected(prev => prev.map((_, index) => index === changedTokenType));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>{dropdownMenuItems[tokenType]}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>
          {`토큰 사용 방식\n(RefreshToken/AccessToken)`}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdownMenuItems.map((_, index) => (
          <DropdownMenuCheckboxItem
            key={index}
            checked={isSelected[index]}
            onCheckedChange={() => handleTokenType(index)}
          >
            {dropdownMenuItems[index]}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
