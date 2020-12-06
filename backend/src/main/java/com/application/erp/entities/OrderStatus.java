package com.application.shopapp.entities;

import javax.persistence.*;
import java.io.Serializable;

enum FromStatus
{
    OrderPlaced(ToStatus.Cancelled,ToStatus.OrderConfirmed,ToStatus.OrderRejected),
    Cancelled(ToStatus.RefundInitiated,ToStatus.Closed),
    OrderRejected(ToStatus.RefundInitiated,ToStatus.Closed),
    OrderConfirmed(ToStatus.Cancelled,ToStatus.OrderShipped),
    OrderShipped(ToStatus.Delivered),
    Delivered(ToStatus.ReturnRequested,ToStatus.Closed),
    ReturnRequested(ToStatus.ReturnRejected,ToStatus.ReturnApproved),
    ReturnRejected(ToStatus.Closed),
    ReturnApproved(ToStatus.PickUpInitiated),
    PickUpInitiated(ToStatus.PickUpCompleted),
    PickUpCompleted(ToStatus.RefundInitiated),
    RefundInitiated(ToStatus.RefundCompleted),
    RefundCompleted(ToStatus.Closed);

    private ToStatus tostatus;
    private ToStatus toStatus2;
    private ToStatus toStatus3;
    FromStatus(ToStatus toStatus){
        this.tostatus = toStatus;
    }

    FromStatus(ToStatus toStatus,ToStatus toStatus2,ToStatus toStatus3){
        this.tostatus = toStatus;
        this.toStatus2= toStatus2;
        this.toStatus3= toStatus3;
    }
    FromStatus(ToStatus toStatus,ToStatus toStatus2){
        this.tostatus = toStatus;
        this.toStatus2= toStatus2;
    }
}

enum ToStatus
{
    Cancelled,
    OrderConfirmed,
    OrderRejected,
    RefundInitiated,
    Closed,
    OrderShipped,
    Delivered,
    ReturnRequested,
    ReturnRejected,
    ReturnApproved,
    PickUpInitiated,
    PickUpCompleted,
    RefundCompleted


}
@Entity
@Table(name = "order_status")
public class OrderStatus implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToOne
    @JoinColumn(name = "order_product_id")
    private OrderProduct orderProductId;

    @Column(name = "from_status")
    @Enumerated
    private FromStatus fromStatus;
    @Column(name = "to_status")
    @Enumerated
    private ToStatus toStatus;

    @Column(name = "transition_notes_comments")
    private String transitionNotesComments;

    //********************************************************************************************************

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public OrderProduct getOrderProductId() {
        return orderProductId;
    }

    public void setOrderProductId(OrderProduct orderProductId) {
        this.orderProductId = orderProductId;
    }

    public FromStatus getFromStatus() {
        return fromStatus;
    }

    public void setFromStatus(FromStatus fromStatus) {
        this.fromStatus = fromStatus;
    }

    public ToStatus getToStatus() {
        return toStatus;
    }

    public void setToStatus(ToStatus toStatus) {
        this.toStatus = toStatus;
    }

    public String getTransitionNotesComments() {
        return transitionNotesComments;
    }

    public void setTransitionNotesComments(String transitionNotesComments) {
        this.transitionNotesComments = transitionNotesComments;
    }

    @Override
    public String toString() {
        return "OrderStatus{" +
                "id=" + id +
                ", orderProductId=" + orderProductId +
                ", fromStatus=" + fromStatus +
                ", toStatus=" + toStatus +
                ", transitionNotesComments='" + transitionNotesComments + '\'' +
                '}';
    }
}
