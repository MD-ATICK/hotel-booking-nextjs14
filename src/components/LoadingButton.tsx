import Loading from "@/app/loading";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";


interface LoadingButtonProps extends ButtonProps {
    isPending?: boolean
}

export default function LoadingButton({ isPending, disabled, className, ...props }: LoadingButtonProps) {
    return (
        <Button
            className={cn('', className)}
            disabled={disabled || isPending}
            {...props}
        >
            {isPending ? <Loading /> : props.children}
        </Button>
    )
}
