import { useEffect, useState } from "react";
import { EyeIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { useOrders } from "@/store/orders";
import { Order } from "@/types/order";
import {
    Button,
    Chip,
    getKeyValue,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
    useDisclosure
} from "@heroui/react";
import { CardGarment } from "@/components/card-garment";

const COLUMNS = [
    {
        key: "_id",
        label: "ID"
    },
    {
        key: "totalPrice",
        label: "TOTAL"
    },
    {
        key: "date",
        label: "DATE"
    },
    {
        key: "status",
        label: "STATUS"
    },
    {
        key: "action",
        label: "ACTION"
    }
];

export default function OrderPage() {
    const orders = useOrders((state) => state.orders) as Array<Order>;
    const loading = useOrders((state) => state.loading);
    const error = useOrders((state) => state.error);
    const getOrders = useOrders((state) => state.getOrders);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [record, setRecord] = useState<Order>();

    useEffect(() => {
        getOrders();
    }, []);

    const onViewDetailsHandler = (item: Order) => {
        return () => {
            setRecord(item);
            onOpen();
        };
    };

    return (
        <DefaultLayout>
            <div className="flex flex-col items-center justify-center p-6 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-4">Orders</h1>
                <div className="text-sm text-gray-600 mb-2">Here you can view all your orders.</div>
                {loading && <div className="text-lg text-gray-600">Loading orders...</div>}
                {error && <div className="text-red-600 mb-4">Error: {error.message}</div>}
                {!loading && !error && (
                    <>
                        <div className="text-sm text-gray-600 mb-4">Total orders: {orders?.length}</div>
                        <Table aria-label="Orders table" isHeaderSticky>
                            <TableHeader columns={COLUMNS}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
                            <TableBody emptyContent={"No orders found."} items={orders}>
                                {(item) => {
                                    return (
                                        <TableRow key={item._id}>
                                            {(columnKey) => {
                                                if (columnKey === "_id") {
                                                    return <TableCell>Ref {item._id}</TableCell>;
                                                }
                                                if (columnKey === "date") {
                                                    const date = new Date(item.date);
                                                    return <TableCell>{`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}</TableCell>;
                                                }
                                                if (columnKey === "totalPrice") {
                                                    return <TableCell>{item.totalPrice.toFixed(2)}€</TableCell>;
                                                }
                                                if (columnKey === "status") {
                                                    return (
                                                        <TableCell>
                                                            <Chip className="capitalize border-none gap-1 text-default-600" color="success" size="sm" variant="dot">
                                                                Shipped
                                                            </Chip>
                                                        </TableCell>
                                                    );
                                                }
                                                if (columnKey === "action") {
                                                    return (
                                                        <TableCell onClick={onViewDetailsHandler(item)}>
                                                            <Tooltip content="Details">
                                                                <span className="text-lg text-default-500 cursor-pointer active:opacity-50">
                                                                    <EyeIcon />
                                                                </span>
                                                            </Tooltip>
                                                        </TableCell>
                                                    );
                                                }
                                                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                                            }}
                                        </TableRow>
                                    );
                                }}
                            </TableBody>
                        </Table>
                    </>
                )}
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Garment Details</ModalHeader>
                            <ModalBody>
                                {record && (
                                    <>
                                        <div>
                                            <strong>Reference:</strong> {record._id}
                                        </div>
                                        <div>
                                            <strong>Date:</strong> {new Date(record.date).toLocaleString()}
                                        </div>
                                        <div>
                                            <strong>Total Price:</strong> {record.totalPrice.toFixed(2)}€
                                        </div>
                                        <div>
                                            <strong>Status:</strong>{" "}
                                            <Chip className="capitalize border-none gap-1 text-default-600" color="success" size="sm" variant="dot">
                                                Shipped
                                            </Chip>
                                        </div>

                                        <div className="mt-4">
                                            <strong>Garments:</strong>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 w-full">
                                            {record?.orderItems?.length &&
                                                record?.orderItems?.map((item) => (
                                                    <div key={`${item.garment._id}-${item.size}`} className="flex flex-col gap-2">
                                                        <CardGarment
                                                            garment={item.garment}
                                                            chips={[
                                                                { label: item.garment?.type, color: item.garment?.type === "new" ? "success" : "danger" },
                                                                { label: item.size, color: "secondary" },
                                                                { label: `x${item.quantity}`, color: "warning" }
                                                            ]}
                                                        />
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onPress={onClose}>
                                    Done
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </DefaultLayout>
    );
}
